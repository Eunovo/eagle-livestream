import { useParams } from "react-router";
import { Header } from "../../components/header";
import "./streaming.css";

export const Stream: React.FC = () => {
    const { channelId } = useParams<{ channelId: string }>();

    return <div className='stream-view'>
        <Header />
    </div>
}
