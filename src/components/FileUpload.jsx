import React from 'react'
import {Dropzone, MIME_TYPES} from '@mantine/dropzone'
import {Button, Group, Text} from '@mantine/core'
import {IconCloudUpload, IconFile} from '@tabler/icons-react'

export default function FileUpload({onFileUpload, fileName}) {
    return (
        <Dropzone
            className='flex items-center justify-center'
            accept={MIME_TYPES.json}
            maxSize={3 * 1024 ** 2}
            onDrop={(files) => {
                onFileUpload(files)
            }}
        >
            {/* children */}
            <Group
                style={{width: '100%', maxWidth: '900px'}}
                position="center"
                className='border border-dashed border-black py-20 px-2  rounded-xl flex flex-col gap-4 justify-center items-center w-full'
            >
                {fileName ? (
                    <div className="flex flex-row items-center justify-start bg-gray-100 p-2 rounded-lg shadow-sm gap-2">
                        <IconFile size={24} color="#81A0FF" />
                        <Text className="text-gray-800 font-medium">
                            {fileName}
                        </Text>
                    </div>

                ) : (
                    <div className="justify-center items-center"><IconCloudUpload
                        className='items-center w-full '
                        size={35}
                        color="#81A0FF"
                        stroke={1.5}
                    />

                        <p className='text-lg px-8 py-2'>
                            Select Your JSON or Drag and drop
                        </p>
                        <p className="font-light text-xs italic pb-4">Json Accepted</p>
                        <Button variant="filled" color="#81A0FF" radius="md">Browse</Button>
                    </div>
                )}


                <Dropzone.Accept>

                </Dropzone.Accept>
            </Group>
        </Dropzone>
    )
}
