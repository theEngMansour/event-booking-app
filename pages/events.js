import { useQuery } from "@apollo/client";
import { EVENTS} from "hooks/queries";

export default function Event() {
    const { loading, error, data } = useQuery(EVENTS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error.message}</p>;

    return data.events.map(({ id, title, description }) => (
        <div key={id}>
        <h3>{title}</h3>
        <b>About this location:</b>
        <p>{description}</p>
        <br />
        </div>
    ));
}