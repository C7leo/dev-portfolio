import { createProfile } from "./profile.model.js";

/**
 * Domain Service: ProfileService
 * - Aquí podrías luego traer data desde un JSON, CMS o API.
 * - Por ahora devolvemos data "mock" pero ordenada.
 */

export function getProfile() {
  return createProfile({
    username: "C7leo",
    fullName: "Camilla Leonor Espinoza Vivas",
    title: "Software Engineering Student",
    tagline: "I build fun and impactful stuff ✨",
    location: "Lima, Perú",
    pronouns: "she/her",
    bio: [
      "Exploring backend, data and automation.",
      "Building solutions one commit at a time ⚙️",
    ],
  });
}
