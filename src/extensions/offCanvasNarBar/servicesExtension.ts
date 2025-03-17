/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { SPFI, spfi, SPFx, PermissionKind } from "@pnp/sp/presets/all";
import "@pnp/sp/webs";
import "@pnp/sp/site-users/web";

import { ExtensionContext } from '@microsoft/sp-extension-base';

export class ItemServiceExtension {
    private spweb: SPFI

    constructor(private context: ExtensionContext) {
        this.spweb = spfi().using(SPFx(this.context as any));
    }
    
    public async getCurrentUserGroups() { 
        const groups = await this.spweb.web.currentUser.groups();
        return groups;
    }

    public async getAllItem(listName: string) {
        const items = await this.spweb.web.lists.getByTitle(listName).items();
        return items;
    }

    public async getUserPermission() {
        const perms = await this.spweb.web.getCurrentUserEffectivePermissions();
        const perms2 = await this.spweb.web.hasPermissions(perms, PermissionKind.ManageWeb)
        return perms2;
    }
    
}