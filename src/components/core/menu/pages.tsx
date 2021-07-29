import {
  add,
  addOutline,
  albums,
  albumsOutline,
  exit,
  exitOutline,
  list,
  listOutline
} from "ionicons/icons";

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

export const appPages: AppPage[] = [
  {
    title: "observation.list.title",
    url: "/observation/list",
    iosIcon: listOutline,
    mdIcon: list
  },
  {
    title: "observation.add_observation",
    url: "/observation/create",
    iosIcon: addOutline,
    mdIcon: add
  },
  {
    title: "myObservations.title",
    url: "/my-observations",
    iosIcon: albumsOutline,
    mdIcon: albums
  },
  {
    title: "auth.logout",
    url: "/logout",
    iosIcon: exitOutline,
    mdIcon: exit
  }
];
