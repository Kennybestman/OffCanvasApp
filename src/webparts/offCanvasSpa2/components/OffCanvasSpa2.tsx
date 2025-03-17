/* eslint-disable react/self-closing-comp */
import * as React from 'react';
import styles from './OffCanvasSpa2.module.scss';
import type { IOffCanvasSpa2Props } from './IOffCanvasSpa2Props';
import { HashRouter, Switch, Route } from 'react-router-dom';
import SPATaskList2 from './SPATaskList2/SPATaskList2';
import { Spinner, SpinnerSize } from '@fluentui/react/lib/Spinner';

export default class OffCanvasSpa2 extends React.Component<IOffCanvasSpa2Props> {
  public render(): React.ReactElement<IOffCanvasSpa2Props> {
    
    return (
        <HashRouter>
            <Switch>
                <React.Suspense fallback={<Spinner className={styles.spinner} label="Loading items..." size={SpinnerSize.large} />}>
                    <Route exact={true} path="/" component={() => <SPATaskList2 {...this.props} />}></Route>
                    {/*<Route exact={true} path="/LoanRequestForm" component={() => <LoanRequestForm {...this.props} />}></Route>*/}

                </React.Suspense>
            </Switch>
        </HashRouter>
    );
  }
}
