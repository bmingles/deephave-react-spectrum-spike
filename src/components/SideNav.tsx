import React from 'react'
import { Link } from 'react-router-dom'
import { Heading, Link as LinkSpectrum } from '@adobe/react-spectrum'
import { routes } from '@/utils/routes'
import styles from './SideNav.module.css'

export interface SideNavProps {}

const SideNav: React.FC<SideNavProps> = () => {
  return (
    <nav className={styles.container}>
      <Heading level={3}>Menu</Heading>
      {routes.map(({ meta: { slug, title } }) => (
        <LinkSpectrum key={slug}>
          <Link to={`/${slug}`}>{title}</Link>
        </LinkSpectrum>
      ))}
    </nav>
  )
}
SideNav.displayName = 'SideNav'

export default SideNav
