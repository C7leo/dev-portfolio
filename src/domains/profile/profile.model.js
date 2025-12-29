/**
 * Domain Model: Profile
 * - Esto representa el "núcleo" de tu portafolio: tu identidad.
 */

export function createProfile({
  username,
  fullName,
  title,
  tagline,
  location,
  pronouns,
  bio,
}) {
  return {
    username,
    fullName,
    title,
    tagline,
    location,
    pronouns,
    bio,
  };
}
