/* eslint-disable react/self-closing-comp */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable no-new */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import styles from './TopNav.module.scss';
import { SPComponentLoader } from '@microsoft/sp-loader';
import { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import CloseButton from 'react-bootstrap/CloseButton';
import Offcanvas from 'react-bootstrap/Offcanvas';

export interface ITopNavigationBootProps {
    description?: string;
    logoUrl?: string;    
    userLogin?: string; 
    sitePageUrl1?: string;
    sitePageUrl2?: string;
    sitePageUrl3?: string;
}

const customMessage = {
    fontfamily: 'Segoe UI',
    fontsize: '14px',
    fontweight: 400,
    background: 'rgb(223, 246, 221)',
    boxsizing: 'borderbox',
    color: 'rgb(50, 49, 48)',
    minheight: '32px',
    width: '100%',
    display: 'none'
};

const customMessageError = {
    fontfamily: 'Segoe UI',
    fontsize: '14px',
    fontweight: 400,
    background: 'rgb(242 170 170)',
    boxsizing: 'borderbox',
    color: 'rgb(50, 49, 48)',
    minheight: '32px',
    width: '100%',
    display: 'none'
};

const TopNavigationBoot: React.FunctionComponent<ITopNavigationBootProps> = (props) => {

    const siteUrl: string = window.location.href;
    const currentSite: string[] = siteUrl.split("#/");
    const currentSiteUrl: any[] = [siteUrl, currentSite[0]];

    useEffect(() => {
        SPComponentLoader.loadCss("https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css");
    }, []);

    const closeButton = () => {        
        document.getElementById("customdisplayMessage").style.display = "none";
        document.getElementById("customdisplayMessageError").style.display = "none";
    }  

    // The first Navbar tag is for the first two sites and the second Navbar tag is for the third site
    // props.sitePageUrl1 and props.sitePageUrl2 are the first two sites
    // Under Navbar tag 1, I have two Nav tags for the first two sites
    // props.sitePageUrl3 is the third site

    return (
        <div>
            {(currentSiteUrl.indexOf(props.sitePageUrl1) > -1 || currentSiteUrl.indexOf(props.sitePageUrl2) > -1) && (<div className={styles.newbannerngx}>
                <img alt="" src={props.logoUrl} className={styles.newfbnlogo} />
                <div className={styles.menuLogo}> </div>
                <div>
                    {(currentSiteUrl.indexOf(props.sitePageUrl1) > -1) && (
                        <p className={styles.brand}>Hackthon Demo App 1</p>
                    )}
                    {(currentSiteUrl.indexOf(props.sitePageUrl2) > -1) && (
                        <p className={styles.brand}>Hackthon Demo App 2</p>
                    )}
                    <div className={styles.brandUser}>{props.userLogin}</div>
                </div>
            </div>)}
            {(currentSiteUrl.indexOf(props.sitePageUrl1) > -1 || currentSiteUrl.indexOf(props.sitePageUrl2) > -1) && (<>
                {['sm'].map((expand) => (
                    <Navbar collapseOnSelect key={expand} expand={expand} bg="darkerblue" variant="dark">
                        <Container>
                            <Navbar.Brand>
                            </Navbar.Brand>
                            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                            <Navbar.Offcanvas id={`offcanvasNavbar-expand-${expand}`} aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`} placement="end">
                                <Offcanvas.Header closeButton>
                                    <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                                        Menu List
                                    </Offcanvas.Title>
                                </Offcanvas.Header>
                                <Offcanvas.Body>
                                    {(currentSiteUrl.indexOf(props.sitePageUrl1) > -1) && (
                                        <Nav className="justify-content-end flex-grow-1 pe-3">
                                            <Nav.Link href="#/" onClick={() => { closeButton() }}>Task List App 1</Nav.Link>
                                            <Nav.Link href="#/CLEArchiveFinder" onClick={() => { closeButton() }}>Archive Finder</Nav.Link>
                                        </Nav>
                                    )}
                                    {(currentSiteUrl.indexOf(props.sitePageUrl2) > -1) && (
                                        <Nav className="justify-content-end flex-grow-1 pe-3">
                                            <Nav.Link href="#/" onClick={() => { closeButton() }}>Task List App 2</Nav.Link>
                                            <Nav.Link href="#/CLEArchiveFinder" onClick={() => { closeButton() }}>Past Quest</Nav.Link>
                                        </Nav>
                                    )}
                                </Offcanvas.Body>
                            </Navbar.Offcanvas>
                        </Container>
                    </Navbar>)
                )}
            </>)}
            
            {(currentSiteUrl.indexOf(props.sitePageUrl3) > -1) && (<div className={styles.newbanner}>
                <img alt="" src={props.logoUrl} className={styles.newfbnlogo} />
                <div className={styles.menuLogo}> </div>
                <p className={styles.brand2}>Hackthon Demo App 3</p>                
            </div>)}
            {(currentSiteUrl.indexOf(props.sitePageUrl3) > -1) && (['sm'].map((expand) => (
                <Navbar collapseOnSelect key={expand} expand={expand} bg="darkerblue2" variant="dark">
                    <Container>
                        <Navbar.Brand>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                        <Navbar.Offcanvas id={`offcanvasNavbar-expand-${expand}`} aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`} placement="end">
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                                    Menu List
                                </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <Nav className="justify-content-end flex-grow-1 pe-3">
                                    <Nav.Link href="#/" onClick={() => { closeButton() }}>Task List App 3</Nav.Link>
                                    <Nav.Link href="#/CLEArchiveFinder" onClick={() => { closeButton() }}>Report</Nav.Link>
                                </Nav>
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>)
            ))}
            {(currentSiteUrl.indexOf(props.sitePageUrl3) > -1) && (<div className={styles.menuLogo}> </div>)}
            {(currentSiteUrl.indexOf(props.sitePageUrl3) > -1) && (<div className={styles.brandUser2}>{props.userLogin}</div>)}

            <div style={customMessage} id="customdisplayMessage">
                <div className="d-flex justify-content-between p-2">
                    <div id="customdisplayMessageText"></div>
                    <CloseButton variant="white" onClick={() => closeButton()} />
                </div>
            </div>
            <div style={customMessageError} id="customdisplayMessageError">
                <div className="d-flex justify-content-between p-2">
                    <div id="customdisplayMessageErrorText"></div>
                    <CloseButton variant="white" onClick={() => closeButton()} />
                </div>
            </div>
                
        </div>
    );    
}
export default TopNavigationBoot;