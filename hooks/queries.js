import { gql } from "@apollo/client";

export const EVENTS = gql`
  query Events {
    events {
      id
      title
      price
      date
      creatorId
    }
  }
`;

export const GETEVENT = gql`
  query GetIdEvents($eventId: ID!) {
    getIdEvents(eventId: $eventId) {
      id
      title
      description
      price
      date
      creator {
        username
      }
    }
  }
`;
