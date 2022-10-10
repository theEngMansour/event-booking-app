import prisma from "lib/prisma";
import { useQuery } from "@apollo/client";
import { GETEVENT } from "hooks/queries";

export default function Show({ params }) {
  const { loading, error, data } = useQuery(GETEVENT, {
    variables: { eventId: params?.id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <div>
        <h1>{data?.getIdEvents?.title}</h1>
        <h5>{data?.getIdEvents?.description}</h5>
        <li>{data?.getIdEvents?.price}</li>
        <li>{data?.getIdEvents?.date}</li>
        <p>{data?.getIdEvents?.creator?.username}</p>
    </div>
  )
}

export async function getStaticPaths() {
  const items = await prisma.event.findMany();
  const paths = items.map((e) => ({ params: { id: e.id.toString() } }));
  return {
    paths,
    fallback: true, // Reload any id new for events added
  };
}

export async function getStaticProps({ params }) {
  const item = await prisma.event.findUnique({
    where: {
      id: Number(params.id),
    },
  });
  return {
    props: {
      params: JSON.parse(JSON.stringify(item)),
    },
  };
}
