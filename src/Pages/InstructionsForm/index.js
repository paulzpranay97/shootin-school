import React from 'react'
import FormCom from '../../Components/InstructionsCom/FormCom'
import { PlayerAccountProvider } from '../../APIContext/PlayerAccountContext'
import { InstructionsContextProvider } from '../../APIContext/InstructionsContext'


function InstructionsForm() {

    return (
        <div style={{ minHeight: "10vh" }} >
            <PlayerAccountProvider>
                <InstructionsContextProvider>
                     <FormCom />
                </InstructionsContextProvider>
            </PlayerAccountProvider>
        </div>
    )
}

export default InstructionsForm