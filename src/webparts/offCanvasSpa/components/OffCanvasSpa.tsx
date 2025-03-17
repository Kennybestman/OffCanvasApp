/* eslint-disable @microsoft/spfx/import-requires-chunk-name */
/* eslint-disable react/self-closing-comp */
import * as React from 'react';
import styles from './OffCanvasSpa.module.scss';
import type { IOffCanvasSpaProps } from './IOffCanvasSpaProps';
import { Suspense } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import lazyWithPreload from 'react-lazy-with-preload';
import { Spinner, SpinnerSize } from '@fluentui/react/lib/Spinner';

const SPATaskList1 = lazyWithPreload(() => import('./SPATaskList1/SPATaskList1'));

export default class OffCanvasSpa extends React.Component<IOffCanvasSpaProps> {
  public render(): React.ReactElement<IOffCanvasSpaProps> {    

    return (
        <HashRouter>
            <Switch>
                <Suspense fallback={<Spinner className={styles.spinner} label="Loading items..." size={SpinnerSize.large} />}>
                    <Route exact={true} path="/" component={() => <SPATaskList1 {...this.props} />}></Route>
                    {/*<Route exact={true} path="/LoanRequestForm" component={() => <LoanRequestForm {...this.props} />}></Route>*/}
                    
                </Suspense>
            </Switch>
        </HashRouter>
    );
  }
}
