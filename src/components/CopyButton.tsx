import clsx from "clsx";
import { IconButton } from "@material-ui/core"
import { FileCopyOutlined } from "@material-ui/icons"
import { useSnackbar } from "notistack";

export interface CopyButtonProps {
    className?: string
    text: string
}

export const CopyButton: React.FC<CopyButtonProps> = ({ className, text }) => {
    const { enqueueSnackbar } = useSnackbar();

    return <IconButton
        className={clsx(className)}
        onClick={() => {
            navigator.clipboard.writeText(text);
            enqueueSnackbar("Link copied to clipboard");
        }}
    >
        <FileCopyOutlined />
    </IconButton>
}
