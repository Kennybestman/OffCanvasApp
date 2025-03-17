/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'OffCanvasSpaWebPartStrings';
import OffCanvasSpa from './components/OffCanvasSpa';
import { IOffCanvasSpaProps } from './components/IOffCanvasSpaProps';
import { SPComponentLoader } from '@microsoft/sp-loader';

export interface IOffCanvasSpaWebPartProps {
  description: string;
}

const resultarr: any[] = [];
const resultarrStat: any[] = [];
const resultPageSize: any[] = [];

const approvals = [{ code: "MRQ", name: 'My Request' }, { code: "PMA", name: 'Pending my Approval' }, { code: "ABM", name: 'Approve by Me' },]
const requestStatus = ['Pending', 'Approved', 'Declined'];
const pageSizes = [2, 5, 10, 20]

approvals.map((t: any) => {
    resultarr.push({
        key: t.name,
        text: t.name
    });
})

requestStatus.map((t: any) => {
    resultarrStat.push({
        key: t,
        text: t
    });
})

pageSizes.map((t: any) => {
    resultPageSize.push({
        key: t,
        text: t
    });
})

export default class OffCanvasSpaWebPart extends BaseClientSideWebPart<IOffCanvasSpaWebPartProps> {

 private _environmentMessage: string = '';

  public render(): void {
    const element: React.ReactElement<IOffCanvasSpaProps> = React.createElement(
      OffCanvasSpa,
      {
            description: this.properties.description,
            context: this.context,
            environmentMessage: this._environmentMessage,
            hasTeamsContext: !!this.context.sdks.microsoftTeams,
            approvals: resultarr,
            requestStatus: resultarrStat,
            pageSize: resultPageSize
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onInit(): Promise<void> {
      SPComponentLoader.loadCss("https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css");

    return this._getEnvironmentMessage().then(message => {
      this._environmentMessage = message;
    });
  }



  private _getEnvironmentMessage(): Promise<string> {
    if (!!this.context.sdks.microsoftTeams) { // running in Teams, office.com or Outlook
      return this.context.sdks.microsoftTeams.teamsJs.app.getContext()
        .then(context => {
          let environmentMessage: string = '';
          switch (context.app.host.name) {
            case 'Office': // running in Office
              environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentOffice : strings.AppOfficeEnvironment;
              break;
            case 'Outlook': // running in Outlook
              environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentOutlook : strings.AppOutlookEnvironment;
              break;
            case 'Teams': // running in Teams
            case 'TeamsModern':
              environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentTeams : strings.AppTeamsTabEnvironment;
              break;
            default:
              environmentMessage = strings.UnknownEnvironment;
          }

          return environmentMessage;
        });
    }

    return Promise.resolve(this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentSharePoint : strings.AppSharePointEnvironment);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
