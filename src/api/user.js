import { list as listService, get as getService, update as updateService } from './mock/users'

export async function list() {
	return await listService()
}

export async function get(town) {
	return await getService(town)
}

export async function update(town) {
	return await updateService(town)
}
