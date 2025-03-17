/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @rushstack/no-new-null */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { format } from "@fluentui/react/lib/Utilities";

export class HelplerService{
    
    public FormatDate = (date: any): string => {
        console.log(date);
        const date1 = new Date(date);
        const year = date1.getFullYear();
        let month = (1 + date1.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;
        let day = date1.getDate().toString();
        day = day.length > 1 ? day : '0' + day;
        return month + '/' + day + '/' + year;
    };

    public formatToSimpleDate = (date: any | string | null | undefined) =>        
        date !== null && date !== undefined
            ? format(date, "dd/MM/Y")
            : undefined;

    public getCurrentTimeStamp = () => {
        let timeStamp = Date.now();
        return timeStamp;
    }

    public getTodayDate = () => {
        let timeStamp = Date.now();
        let tday = new Date(timeStamp)
        return tday;
    }

    public updateSiteTitle = (propsSetting: any, siteTitle: string) => {
        let siteName = propsSetting.pageContext.web.absoluteUrl.split("/sites/")[1].split("/SitePages/")[0]
        document.title = `${siteName} | ${siteTitle}`;
    }
}