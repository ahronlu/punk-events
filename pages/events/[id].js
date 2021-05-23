import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import Layout from "@/components/Layout";
import EventMap from "@/components/EventMap";
import styles from "@/styles/Event.module.css";
import { parseCookies } from "@/helpers/index";

export default function EventPage({ evt, token }) {
  const router = useRouter();

  const deleteEvent = async (e) => {
    if (confirm("Are you sure?")) {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/events/${evt._id}`, {
        method: "DELETE",
        Authorization: `Bearer ${token}`,
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
      } else {
        router.push("/events");
      }
    }
  };

  return (
    <Layout>
      <div className={styles.event}>
        <div className={styles.controls}>
          <Link href={`/events/edit/${evt._id}`}>
            <a className={styles}>
              <FaPencilAlt /> Edit Event
            </a>
          </Link>
          <a href="#" className={styles.delete} onClick={deleteEvent}>
            <FaTimes /> DeleteEvent
          </a>
        </div>
        <span>
          {new Date(evt.date).toLocaleDateString()} at {evt.time}
        </span>
        <h1>{evt.name}</h1>
        <ToastContainer />
        {evt.image && (
          <div className={styles.image}>
            <Image src={evt.image} width={960} height={600} />
          </div>
        )}
        <h3>Performers:</h3>
        <p>{evt.performers}</p>
        <h3>Description:</h3>
        <p>{evt.description}</p>
        <h3>Venue: {evt.venue}</h3>
        <p>{evt.address}</p>

        <EventMap evt={evt} />

        <Link href="/events">
          <a className={styles.back}>{"<"} Go Back</a>
        </Link>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ query: { id }, req }) {
  const { token } = parseCookies(req);

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/events/${id}`);

  const evt = await res.json();

  return {
    props: {
      evt,
      token
    },
  };
}
