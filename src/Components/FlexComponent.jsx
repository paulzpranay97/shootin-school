import React from 'react';
import { Button } from 'primereact/button';

const FlexComponent = ({className, justifyContent, flexDirection, flexWrap, alignItems, width, gap, children, style  }) => {
    const containerStyle = {
        display: 'flex',
        justifyContent: justifyContent || 'space-between',
        alignItems: alignItems || 'center',
        flexDirection: flexDirection || 'row',
        flexWrap: flexWrap || 'nowrap',
        width : width || '100%',
        gap : gap || '0px',
        ...style
    };

    return (
        <div className={className} style={containerStyle}>
            {children}
        </div>
    );
};

export default FlexComponent;
