/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-floating-promises */
import * as React from 'react';
import styles from '../OffCanvasSpa2.module.scss';
import { IOffCanvasSpa2Props, ITask } from '../IOffCanvasSpa2Props';
import { HelplerService } from '../../../../services/helper';
import { useEffect, useState } from 'react';
import { PaginationControl } from 'react-bootstrap-pagination-control';
import { Spinner, SpinnerSize } from '@fluentui/react/lib/Spinner';
import { IDropdownOption, Dropdown } from '@fluentui/react';
import { IDatePickerStrings, DatePicker } from '@fluentui/react/lib/DatePicker';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export const DatePickerStrings: IDatePickerStrings = {
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    shortDays: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    goToToday: 'Go to today',
    prevMonthAriaLabel: 'Go to previous month',
    nextMonthAriaLabel: 'Go to next month',
    prevYearAriaLabel: 'Go to previous year',
    nextYearAriaLabel: 'Go to next year',
    invalidInputErrorMessage: 'Invalid date format.'
};

const SPATaskList2: React.FunctionComponent<IOffCanvasSpa2Props> = (props) => {
    const [items, setitems] = useState([])
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(2);
    const [totalItem, setTotalItem] = useState(pageSize)
    const [processing, setProcessing] = useState(false)
    const [isDisabled, setIsDisabled] = useState(true);
    const helperService = new HelplerService();
    const [itemFilter, setItemFilter] = useState<ITask>({
        startDate: new Date(helperService.getCurrentTimeStamp()),
        endDate: new Date(helperService.getCurrentTimeStamp()),
        filterBy: "Pending my Approval",
        requestStatus: "Pending"
    })

    useEffect(() => {
        helperService.updateSiteTitle(props.context, "Task List App 2")
        getAllRequest(itemFilter.filterBy);
    }, []);

    const getAllRequest = async (flterBy: string) => {  
        setProcessing(true);
        setPage(1)
        setTotalItem(pageSize)
        setitems([]);
        setProcessing(false);
    }

    const viewData = (evt: any, id: number, approveCode: string) => {
        evt.preventDefault();
        console.log(id, approveCode); 
    }

    const onDropdownMultiChange = async (event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): Promise<void> => {
        await setItemFilter({ ...itemFilter, filterBy: item.key as string });
        setPage(1);        
    }

    const getRequestState = async (event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): Promise<void> => {
        await setItemFilter({ ...itemFilter, requestStatus: item.key as string });  
        (item.key as string === "Pending") ? setIsDisabled(true) : setIsDisabled(false);
    }

    const getSearchItem = async () => {
        setPage(1);        
    }

    const getCurrentPageItem = async (pageNumber: number) => {
        setPage(pageNumber);
    }

    const getPageSize = async (event: any, item: IDropdownOption): Promise<void> => {
        event.preventDefault()
        const psize = Number(item.key as string)
        setPageSize(psize);
        setPage(1);
    }
    
    return (
        <div className={styles.offCanvasSpa2}>
            <div className={styles.servereq}>
                {processing === true && (<Spinner className={styles.spinner} ariaLive="assertive" label="Processing item..." size={SpinnerSize.large} />)}
                <Container fluid>
                    <h5>Task List App 2</h5>
                    <Row>
                        <Col xs={12} md={3}>
                            <Dropdown options={props.approvals} selectedKey={itemFilter.filterBy} onChange={(e, index) => { onDropdownMultiChange(e, index) }} label="Filter By" />
                        </Col>
                        <Col xs={12} md={3}>
                            <DatePicker label="Start Date" value={itemFilter.startDate} allowTextInput={false} strings={DatePickerStrings} onSelectDate={(e) => { setItemFilter({ ...itemFilter, startDate: e }) }} ariaLabel="Select start date" formatDate={helperService.FormatDate} />
                        </Col>
                        <Col xs={12} md={3}>
                            <DatePicker label="End Date" value={itemFilter.endDate} minDate={new Date(itemFilter.startDate)} allowTextInput={false} strings={DatePickerStrings} onSelectDate={(e) => { setItemFilter({ ...itemFilter, endDate: e }) }} ariaLabel="Select end date" formatDate={helperService.FormatDate} />
                        </Col>
                        <Col xs={12} md={3}>
                            <Dropdown options={props.requestStatus} disabled={isDisabled} selectedKey={itemFilter.requestStatus} onChange={(e, index) => { getRequestState(e, index) }} label="Request Status" />
                        </Col>
                    </Row>
                    <div className={styles.searchBtn}>
                        <div className="row">
                            <div className="col-3">
                                <Button variant="primary" onClick={() => getSearchItem()} className="rounded-0">Search </Button>
                            </div>
                        </div>
                    </div>
                    
                    <div>
                        <Table responsive="sm" className={styles.table}>
                            <thead>
                                <tr>
                                    <th>S/N</th>
                                    <th>Staff Name</th>
                                    <th>Current Approver</th>
                                    <th>Status</th>
                                    <th>Proposed Country</th>                                    
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((item: any, i: any) => {
                                    //
                                    return [
                                        <tr key={i} onClick={(e) => viewData(e, item.ID, item.Current_Approver_Code)}> {/*onClick={() => findData(item.ID, item.Current_Approver_Code, item.PendingUserLogin, item.PendingUserEmail)}*/}
                                            <td>{(page - 1) * pageSize + i + 1}</td>
                                            <td>{item.FullName}</td>
                                            <td>{item.Current_Approver}</td>
                                            <td>{item.Approval_Status}</td>
                                            <td>{item.ProposedCountry}</td>
                                        </tr>
                                    ];
                                })}
                            </tbody>
                        </Table>
                        <div className="d-flex justify-content-between p-2">
                            <PaginationControl page={page} between={4} total={totalItem} limit={pageSize} changePage={(page) => { getCurrentPageItem(page) }} ellipsis={1} />
                            <Dropdown options={props.pageSize} className={styles.customSelect} selectedKey={pageSize} onChange={(e, index) => { getPageSize(e, index) }} />
                        </div>
                    </div>
                </Container>                
            </div>
        </div>

    );
};

export default SPATaskList2;

