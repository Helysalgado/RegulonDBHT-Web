import React from 'react';
import Style from './PanelHT.module.css'
import { Link } from 'react-router-dom';
import ModalHT from './ModalHT';

export default function PanelHT(panel, description, enabled = true) {
    if (!enabled) {
        return (
            <div className={Style.dPanel}>
                {panel.title}
            </div>
        )
    }
    return (
        <div className={Style.Panel}>
            <Link to={`/${panel.url}`}>
            <h2 style={{fontSize: "5vh"}} >
            {panel.title}
            </h2>
            </Link>
            <div>
                <ModalHT id={panel?.id} title={panel.title} md_data={panel?.description} />
            </div>
        </div>
    )
}

/*
<button >View all datasets</button>
 <Link to={`/${panel.url}`}>
            <div className={Style.Panel}>
                {panel.title}
            </div>
        </Link>
*/