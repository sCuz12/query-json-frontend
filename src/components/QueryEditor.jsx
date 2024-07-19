import { Button, Container } from '@mantine/core'
import CodeEditor from '@uiw/react-textarea-code-editor'
import React, { useState } from 'react'
import {IconPlayerPlay} from "@tabler/icons-react";

export default function QueryEditor({queryInput , setQueryInput,onSubmitQuery}) {


    return (
        <Container className='w-full flex flex-col gap-4'>
            <CodeEditor value={queryInput}
                language="sql"
                placeholder="Please enter your Query."
                onChange={(e) => setQueryInput(e.target.value)}
                padding={15}
                className='flex w-full'
                style={{
                    backgroundColor: "#f5f5f5",
                    fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                }} />
            {queryInput != "" && (
                <div className={"flex w-full items-start justify-start"}>
                    <Button
                        leftSection={<IconPlayerPlay size={14} />}
                        onClick={onSubmitQuery}
                    >
                        Run Query
                    </Button>
                </div>
            )}
        </Container>
    )
}
