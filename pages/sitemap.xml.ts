// pages/sitemap.xml.tsx
import { GetServerSideProps } from 'next';
import { servicesAPI, projectsAPI } from '../lib/firebase-services';

function Sitemap() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const currentDate = new Date().toISOString().split('T')[0];

  const [services, projects] = await Promise.all([
    servicesAPI.getAll().catch(() => []),
    projectsAPI.getAll().catch(() => []),
  ]);

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>https://voltages.si/</loc>
      <lastmod>${currentDate}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>1.0</priority>
    </url>
    ${services
      .map(
        (service) => `
    <url>
      <loc>https://voltages.si/service/${service.id}</loc>
      <lastmod>${currentDate}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.8</priority>
    </url>`
      )
      .join('')}
    ${projects
      .map(
        (project) => `
    <url>
      <loc>https://voltages.si/project/${project.id}</loc>
      <lastmod>${currentDate}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.7</priority>
    </url>`
      )
      .join('')}
  </urlset>`;

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return { props: {} };
};

export default Sitemap;
