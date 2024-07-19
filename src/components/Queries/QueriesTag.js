import React from 'react';
import {Badge} from "@mantine/core";

const QueriesTag = ({query,onClick}) => {
    return (
        <div className="hover:cursor-pointer shadow shadow-2xl bg-gray-100 rounded-xl p-1 "
               onClick={()=>{onClick(query)}}
        >
            <p className={"text-sm italic"}>{query}</p>
        </div>
    );
};

export default QueriesTag;