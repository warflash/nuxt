import { nextTick } from 'vue'
import { useRoute } from '#app/composables/router'
import { defineNuxtPlugin } from '#app/nuxt'

export default defineNuxtPlugin((nuxtApp) => {
  if (!document.startViewTransition) { return }

  let finishTransition: undefined | (() => void)
  let abortTransition: undefined | (() => void)

  const route = useRoute()
  nuxtApp.hook('page:finish', () => {
    const to = route
    // router.afterEach((to) => {
    if (to.meta.pageTransition === false) { return }

    const promise = new Promise<void>((resolve, reject) => {
      finishTransition = resolve
      abortTransition = reject
    })

    let changeRoute: () => void
    const ready = new Promise<void>(resolve => (changeRoute = resolve))

    const transition = document.startViewTransition!(() => {
      changeRoute()
      console.log('transition started')
      return promise
    })

    transition.finished.then(() => {
      abortTransition = undefined
      finishTransition = undefined
    })

    return ready
  })

  nuxtApp.hook('vue:error', () => {
    abortTransition?.()
    abortTransition = undefined
  })

  nuxtApp.hook('page:finish', async () => {
    await nextTick(() => {
      finishTransition?.()
      finishTransition = undefined
    })
  })
})

declare global {
  interface Document {
    startViewTransition?: (callback: () => Promise<void> | void) => {
      finished: Promise<void>
      updateCallbackDone: Promise<void>
      ready: Promise<void>
    }
  }
}
