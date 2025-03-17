/* eslint-disable @microsoft/spfx/pair-react-dom-render-unmount */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer, PlaceholderContent, PlaceholderName
} from '@microsoft/sp-application-base';

import * as strings from 'OffCanvasNarBarApplicationCustomizerStrings';
import { ItemServiceExtension } from './servicesExtension';
import { setIconOptions } from '@fluentui/react/lib/Styling';
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import TopNavigationBoot, { ITopNavigationBootProps } from './TopNavigationBoot';

const LOG_SOURCE: string = 'OffCanvasNarBarApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IOffCanvasNarBarApplicationCustomizerProperties {
  Top: string;
  // This is an example; replace with your own property
  testMessage: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class OffCanvasNarBarApplicationCustomizer extends BaseApplicationCustomizer<IOffCanvasNarBarApplicationCustomizerProperties> {
    itemService: ItemServiceExtension;

    private _topPlaceholder: PlaceholderContent | undefined;

    // Insert your site assests here
    // Please replace the site name (SPHackathon) with your site name
    // Copy the CustomScript folder to the SiteAssets folder in the site collection
    // The CustomScript folder contains the logo, favicon and css files for the custom top navigation
    // The CustomScript folder is located in the src/extensions folder

    private _cssurl: string = "/sites/SPHackthon/SiteAssets/CustomScript/shyHeaderCustom.css";
    private _cssurl3: string = "/sites/SPHackthon/SiteAssets/CustomScript/shyHeaderCustom3.css";
    private _jsurl: string = "/sites/SPHackthon/SiteAssets/CustomScript/settingScript.css";
    private _icourl: string = "/sites/SPHackthon/SiteAssets/CustomScript/bkgrlogo.ico";
    private _logourl: string = "/sites/SPHackthon/SiteAssets/CustomScript/bkgrlogo.png";

    // Insert your site pages url here
    private siteName1: string = "/sites/SPHackthon/SitePages/sphackthon_demo1.aspx";
    private siteName2: string = "/sites/SPHackthon/SitePages/sphackthon_demo2.aspx";
    private siteName3: string = "/sites/SPHackthon/SitePages/sphackthon_demo3.aspx";

    private userPerms: boolean = false;

  public async onInit(): Promise<void> {
      try {
          setIconOptions({
              disableWarnings: true
          });
      } catch (error) {
          console.log(`Failed to initialize icons: ${error}`);
      }

      await super.onInit();
      this.itemService = new ItemServiceExtension(this.context as any);
      const webUrl: string = this.context.pageContext.web.absoluteUrl;
      const rootUrl: any[] = webUrl.split("/sites/");
      const cssUrl: string = rootUrl[0] + this._cssurl; 
      const cssUrl3: string = rootUrl[0] + this._cssurl3;
      const jsUrl: string = rootUrl[0] + this._jsurl; 
      const icoUrl: string = rootUrl[0] + this._icourl;
      const head: any = document.getElementsByTagName("head")[0] || document.documentElement;
      const siteurlCorpLn1: string = rootUrl[0] + this.siteName1;
      const siteurlCorpLn2: string = rootUrl[0] + this.siteName2;
      const siteurlCorpLn3: string = rootUrl[0] + this.siteName3;

      const siteUrlCorpln: any[] = [siteurlCorpLn1, siteurlCorpLn2, siteurlCorpLn3]

      const currentSiteUrl: string = window.location.href;
      const routeSiteUrl: any[] = currentSiteUrl.split("#/")

      Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);


      //Admin permission method
      this.userPerms = await this.itemService.getUserPermission(); 

      //Checking if the login user has admin right on the site page
      //If not prevent the user from edit the page
      //the jsUrl file contains the css that hide admin right(e.g button) from non-admin users
      if (!this.userPerms) {
          if (jsUrl) {
              const customGearStyle: HTMLLinkElement = document.createElement("link");
              customGearStyle.href = jsUrl; 
              customGearStyle.rel = "stylesheet";
              customGearStyle.type = "text/css";
              head.insertAdjacentElement("beforeEnd", customGearStyle);
          }
      }

      //Check if the current site is the site page for the custom Top Navigation for the SPA Webpart
      //If it is, then render the custom top navigation
      //This is to avoid the custom top navigation from rendering on other site pages
      //With these we can have multiple custom top navigation for different site pages in the same site collection
      if (siteUrlCorpln.indexOf(currentSiteUrl) > -1 || siteUrlCorpln.indexOf(routeSiteUrl[0]) > -1) {
          // SPA css and ico injection
          const siteUrlCorpln12: any[] = siteUrlCorpln.filter((item) => item !== siteurlCorpLn3);
          if (siteUrlCorpln12.indexOf(currentSiteUrl) > -1 || siteUrlCorpln12.indexOf(routeSiteUrl[0]) > -1) {
              if (cssUrl) {
                  const customStyle: HTMLLinkElement = document.createElement("link");
                  customStyle.href = cssUrl;
                  customStyle.rel = "stylesheet";
                  customStyle.type = "text/css";
                  head.insertAdjacentElement("beforeEnd", customStyle);
              }
          }
          const siteUrlCorplnO3: any[] = siteUrlCorpln.filter((item) => item === siteurlCorpLn3);
          if (siteUrlCorplnO3.indexOf(currentSiteUrl) > -1 || siteUrlCorplnO3.indexOf(routeSiteUrl[0]) > -1) {
              if (cssUrl3) {
                  const customStyle: HTMLLinkElement = document.createElement("link");
                  customStyle.href = cssUrl3;
                  customStyle.rel = "stylesheet";
                  customStyle.type = "text/css";
                  head.insertAdjacentElement("beforeEnd", customStyle);
              }
          }


          if (icoUrl) {
              const linkImage = document.querySelector("link[rel*='icon']") as HTMLElement || document.createElement('link') as HTMLElement;
              linkImage.setAttribute('type', 'image/x-icon');
              linkImage.setAttribute('rel', 'shortcut icon');
              linkImage.setAttribute('href', icoUrl);
              document.getElementsByTagName("head")[0].appendChild(linkImage);
          }

          //Handling the top placeholder
          this.context.placeholderProvider.changedEvent.add(this, this._renderPlaceHolders);
          await this._renderPlaceHolders();
      }

    return Promise.resolve();
  }

    private async _renderPlaceHolders() {
        console.log('OffCanvasNarBarApplicationCustomizer._renderPlaceHolders()');

        console.log('Available placeholders: ', this.context.placeholderProvider.placeholderNames.map(name => PlaceholderName[name]).join(', '));

        const rootUrl: any[] = this.context.pageContext.web.absoluteUrl.split("/sites/");
        
        const navprops: ITopNavigationBootProps = {
            description: "",
            logoUrl: rootUrl[0] + this._logourl,
            userLogin: this.context.pageContext.user.displayName,
            sitePageUrl1: rootUrl[0] + this.siteName1,
            sitePageUrl2: rootUrl[0] + this.siteName2,
            sitePageUrl3: rootUrl[0] + this.siteName3
        }

        //Handling the top placeholder
        if (!this._topPlaceholder) {
            this._topPlaceholder = this.context.placeholderProvider.tryCreateContent(
                PlaceholderName.Top,
                { onDispose: this._onDispose });

            if (!this._topPlaceholder) {
                console.error("The expected placeholder (Top) was not found.");
                return;
            }

            if (this.properties) {
                let topString: string = this.properties.Top;
                if (!topString) {
                    topString = "(Top property was not defined.)";
                }

                //Injecting custom Boostrap Off Canvas Top Navigation React component and passing the props
                if (this._topPlaceholder.domElement) {
                    const elem: React.ReactElement<ITopNavigationBootProps> = React.createElement(TopNavigationBoot, navprops);
                    ReactDOM.render(elem, this._topPlaceholder.domElement);
                }
            }
        }
    }

    private _onDispose(): void {
        console.log('[OffCanvasNarBarApplicationCustomizer._onDispose] Disposed custom top and bottom placeholders.');
    }
}
