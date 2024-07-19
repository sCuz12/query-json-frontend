import React from 'react'
import { Dropzone, MIME_TYPES } from '@mantine/dropzone'
import { Group, Text} from '@mantine/core'
import { IconFile, IconUpload } from '@tabler/icons-react'

export default function FileUpload({ onFileUpload, fileName}) {
    return (
        <Dropzone
            className='flex items-center justify-center'
            accept={MIME_TYPES.json}
            maxSize={3 * 1024 ** 2}
            onDrop={(files) => { onFileUpload(files) }}
        >
            {/* children */}
            <Group  
             style={{ width: '100%', maxWidth: '400px' }}
             position="center" 
             className='border border-dashed border-black py-20 px-2  rounded-xl flex flex-col gap-4 justify-center items-center'
             >
                {fileName ? (
                    <div className='flex flex-row items-center justify-center'>
                        <Text>
                            {fileName}
                        </Text>
                        <IconFile size={28}/>
                    </div>

                ) : (
                    <>
                        <p className='text-lg'>
                            Drag JSON file here or click to select file
                        </p>
                        <IconUpload
                            className='items-center w-full '
                            size={28}
                            stroke={1.5}
                        />
                    </>
                )}



                <Dropzone.Accept>

                </Dropzone.Accept>
            </Group>
        </Dropzone>
    )
}
