/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IOffCanvasSpaProps {
    description: string;
    environmentMessage: string;
    hasTeamsContext?: boolean;
    context: any;
    approvals?: any;
    requestStatus?: any;
    pageSize?: any;
}

export interface ITask {
    startDate?: any;
    endDate?: any;
    filterBy?: string;
    requestStatus?: string;
}
