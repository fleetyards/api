import fleetsCollection from 'frontend/api/collections/Fleets'
import modelsCollection from 'frontend/api/collections/Models'
import stationsCollection from 'frontend/api/collections/Stations'
import { Route, NavigationGuardNext } from 'vue-router'

export const fleetRouteGuard = async function fleetRouteGuard(
  to: Route,
  _from: Route,
  next: NavigationGuardNext,
) {
  const fleet = await fleetsCollection.findBySlug(to.params.slug)

  if (!fleet || !fleet.myFleet) {
    next({ name: '404' })
  } else {
    next()
  }
}

export const publicFleetRouteGuard = async function publicFleetRouteGuard(
  to: Route,
  _from: Route,
  next: NavigationGuardNext,
) {
  const fleet = await fleetsCollection.findBySlug(to.params.slug)

  if (!fleet) {
    next({ name: '404' })
  } else {
    next()
  }
}

export const modelRouteGuard = async function modelRouteGuard(
  to: Route,
  _from: Route,
  next: NavigationGuardNext,
) {
  const model = await modelsCollection.findBySlug(to.params.slug)

  if (!model) {
    next({ name: '404' })
  } else {
    next()
  }
}

export const stationRouteGuard = async function stationRouteGuard(
  to: Route,
  _from: Route,
  next: NavigationGuardNext,
) {
  const station = await stationsCollection.findBySlug(to.params.slug)

  if (!station) {
    next({ name: '404' })
  } else {
    next()
  }
}
