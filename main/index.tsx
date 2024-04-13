import { IconPlayerPlay, IconReload } from '@tabler/icons-react';
import React, { useState } from 'react';
import { Button, ButtonToolbar, Col, Container, Nav, Row, Tab } from 'react-bootstrap';
import ReactDOM from 'react-dom/client';
const examples = process.env.EXAMPLES as unknown as string[];

function App() {
    const [tabName, setTabName] = useState(location.hash.replace('#', '') || examples[0]);
    return (
        <Container className="m-0 w-100 p-4 h-75">
            <Row>
                <Col md={4}>
                    <Nav
                        variant="pills"
                        className="flex-column"
                        activeKey={tabName}
                        onSelect={name => {
                            name && setTabName(name);
                        }}
                    >
                        <Nav.Item>Examples:</Nav.Item>
                        {examples.map(name => {
                            return (
                                <Nav.Item key={name}>
                                    <Nav.Link eventKey={name} href={`#${name}`}>
                                        {name}
                                    </Nav.Link>
                                </Nav.Item>
                            );
                        })}
                    </Nav>
                </Col>
                <Col>
                    <Tab.Content className="vh-100">
                        {examples.map(name => {
                            return (
                                <Tab.Pane eventKey={name} key={name} active={tabName == name}>
                                    {tabName === name ? (
                                        <>
                                            <ButtonToolbar className="mb-2 gap-2">
                                                <Button
                                                    size="sm"
                                                    onClick={() => {
                                                        const iframe = document.getElementById(
                                                            name
                                                        ) as HTMLIFrameElement;
                                                        const ctx = iframe.contentWindow as any;
                                                        ctx.main.main();
                                                    }}
                                                >
                                                    <IconPlayerPlay></IconPlayerPlay>
                                                    Run
                                                </Button>
                                                <Button size="sm">
                                                    <IconReload></IconReload>
                                                    Reload
                                                </Button>
                                            </ButtonToolbar>
                                            <iframe
                                                id={name}
                                                title={name}
                                                src={`./examples/${name}/index.html`}
                                                height={800}
                                                className="border p-2 w-100"
                                            ></iframe>
                                        </>
                                    ) : (
                                        <></>
                                    )}
                                </Tab.Pane>
                            );
                        })}
                    </Tab.Content>
                </Col>
            </Row>
        </Container>
    );
}
const root = ReactDOM.createRoot(document.body);
root.render(<App></App>);
