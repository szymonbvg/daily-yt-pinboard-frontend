enum Heading {
  DEFAULT = "Today's link",
}

export function getHeading() {
  if (!localStorage.getItem("heading")) {
    if (!import.meta.env.VITE_DEFAULT_HEADING) {
      return Heading.DEFAULT;
    }
    return import.meta.env.VITE_DEFAULT_HEADING;
  }
  return localStorage.getItem("heading");
}

export function getDefaultHeading() {
  if (!import.meta.env.VITE_DEFAULT_HEADING) {
    return Heading.DEFAULT;
  }
  return import.meta.env.VITE_DEFAULT_HEADING;
}

export function setHeading(heading: string) {
  localStorage.setItem("heading", heading);
  return localStorage.getItem("heading") === heading;
}