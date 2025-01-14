import DatePicker from '../components/DatePicker';
import EditTable from '../components/EditTable';
import { useState, useEffect } from 'react';
import { startInquiry, updateInquiry } from '../api/inquiry';
import { rowToInquiry } from '../js/parseData';
import moment from 'moment';
import { useAlertContext, useSelectedDataContext } from '../hooks/useCustomContext';

const SimpleToolbar = ({ rows, ids, setIds }) => {
    const { alertSuccess, alertError, alertWarning, alertConfirm } = useAlertContext()
    const [action, setAction] = useState(null)

    const handleSaveClick = async () => {
        setAction({ type: "保存", time: new Date() })

        const newInquiries = await Promise.all(rows.map(row => rowToInquiry(row)));

        const res = await updateInquiry(newInquiries[0])
        switch (res.code) {
            case 200:
                alertSuccess(res.message)
                setIds([res.data])
                break
            case 400:
            case 1:
                alertError(res.message)
                break
            default:
                alertError("未知错误")
                break
        }
    }

    const handleStartClick = async () => {
        setAction({ type: "开始询单", time: new Date() })

        let newInquiries;
        if (ids) { newInquiries = ids.map((id) => ({ "inquiryId": id })) }

        const res = await startInquiry(newInquiries, 1)
        switch (res.code) {
            case 200:
                alertWarning(res.message)
                break
            case 400:
            case 1:
                alertError(res.message)
                break
            default:
                alertError("未知错误")
                break
        }

    }

    const handleSplitOrder = async () => {
        const newInquiries = await Promise.all(
            rows.map(row => rowToInquiry(row, inquiryType))
        );

        const res = await postDivideList(newInquiries)
        console.log(res);
    }



    return (
        <div className='row toolbar' >
            <div className='row flex-center'>
                <button onClick={handleSaveClick} >保存</button>
                <button onClick={handleStartClick}>开始询单</button>
                <button onClick={handleSplitOrder}>拆分询单</button>
            </div>
            <div className="row flex-center status">
                {action &&
                    <span>
                        <strong>{action.type}</strong>
                        &nbsp;于&nbsp;
                        <strong>{`${moment(action.time).format('lll')}`}</strong>
                    </span>
                }
            </div>
        </div >
    )

}

const Edit = () => {
    const { selectedData, setSelectedData } = useSelectedDataContext()

    const [ids, setIds] = useState([selectedData.inquiryId])
    const [rows, setRows] = useState([selectedData])

    useEffect(() => {
        if (rows) {
            setSelectedData(rows[0]);
        }
    }, [rows]);

    const [currentDate, setCurrentDate] = useState(new Date());

    return (
        <div className='col full-screen invoice-container'>
            <SimpleToolbar rows={rows} ids={ids} setIds={setIds} />
            <div className='col inquiry-info'>
                <div className='row input-wrapper'>
                    <h1>单据编号：</h1>
                    <input type="text" readOnly name="inquiryCode" value={selectedData?.inquiryCode ?? ""} className='inquiry-code' />
                </div>
                <div className="react-datepicker-container input-wrapper">
                    单据日期：
                    <DatePicker
                        selected={currentDate}
                        onChange={(date) => setCurrentDate(date)
                        }
                    />
                </div>
            </div>
            {rows && <EditTable rows={rows} setRows={setRows} />}
        </div >

    )
}

export default Edit