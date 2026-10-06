import { MotionConfig } from 'motion/react'
import type { ComponentType } from 'react'
import { Route, Routes } from 'react-router'
import { Footer } from './components/Footer'
import { HeadSync } from './components/HeadSync'
import { Header } from './components/Header'
import { SmoothScroll } from './components/SmoothScroll'
import { Contactos } from './pages/Contactos'
import { Experiencias } from './pages/Experiencias'
import { Gestao } from './pages/Gestao'
import { Home } from './pages/Home'
import { Legal } from './pages/Legal'
import { NotFound } from './pages/NotFound'
import { Sobre } from './pages/Sobre'
import { pages, type PageKey } from './routes'

const views: Record<PageKey, ComponentType> = {
  home: Home,
  gestao: Gestao,
  experiencias: Experiencias,
  sobre: Sobre,
  contactos: Contactos,
  privacidade: () => <Legal doc="privacidade" />,
  termos: () => <Legal doc="termos" />,
}

export function App() {
  return (
    <MotionConfig reducedMotion="user">
      <SmoothScroll />
      <HeadSync />
      <Header />
      <main id="conteudo">
        <Routes>
          {pages.map(({ key, path }) => {
            const View = views[key as PageKey]
            return <Route key={path} path={path} element={<View />} />
          })}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </MotionConfig>
  )
}
