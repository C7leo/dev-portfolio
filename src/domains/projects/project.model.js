/**
 * Domain Model: Project
 */

export function createProject({
  id,
  name,
  description,
  stack,
  repoUrl,
  liveUrl,
  featured = false,
}) {
  return {
    id,
    name,
    description,
    stack,
    repoUrl,
    liveUrl,
    featured,
  };
}
