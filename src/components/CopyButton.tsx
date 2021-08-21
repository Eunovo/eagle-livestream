import clsx from "clsx";
import { IconButton } from "@material-ui/core"
import { FileCopyOutlined } from "@material-ui/icons"

export interface CopyButtonProps {
    className?: string
    text: string
}

export const CopyButton: React.FC<CopyButtonProps> = ({ className, text }) => {
    return <IconButton
        className={clsx(className)}
        onClick={() => {
            navigator.clipboard.writeText(text);
        }}
    >
        <FileCopyOutlined />
    </IconButton>
}
