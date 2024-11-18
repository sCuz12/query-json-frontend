import React from 'react';
import {Badge} from "@mantine/core";

const QueriesTag = ({query, onClick}) => {
    const highlightQuery = (query) => {
        const keywords = ["select", "where"]
        const regex = new RegExp(`\\b(${keywords.join("|")})\\b`, "gi"); // Matches keywords case-insensitively
        // Split query and replace keywords with styled elements

        return query.split(regex).map((part, index) =>
                keywords.includes(part.toLowerCase()) ? (

                    <span key={index} className="font-bold text-black">
          {part.toUpperCase()}
        </span>
                ) : (
                    <span key={index}>{part}</span>
                )
        );
    }
    return (
        <div className="hover:cursor-pointer shadow shadow-2xl bg-gray-100 rounded-xl p-1 hover:bg-[#81A0FF] transition"
             onClick={() => {
                 onClick(query)
             }}
        >
            <p className={"text-sm italic"}>{highlightQuery(query)}</p>
        </div>
    );
};

export default QueriesTag;