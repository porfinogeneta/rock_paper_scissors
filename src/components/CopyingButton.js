import styles from './CopyingButton.module.css'
import {useState} from "react";

// plugins
import { CopyToClipboard } from "react-copy-to-clipboard/src";

export default function CopyingButton() {
    // invitation operations
    const [copied, setCopied] = useState(false)

    const link = window.location.href

    return(
        <>
            <h1 style={{color: '#9daaf2'}} className={styles.subtitle}>Copy Link and Invite to Play</h1>
            <CopyToClipboard text={link} onCopy={() => setCopied(true)}>
                <button>Copy Link</button>
            </CopyToClipboard>
            {copied ? <span className={styles.copied}>Copied!</span> : ''}
        </>
    )
}
