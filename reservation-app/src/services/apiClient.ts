const baseUrl = import.meta.env.VITE_API_BASE_URL

export const api = {
  /**
   * --- AUTH ---
   */
  async login(email: string, password: string) {
    const res = await fetch(`${baseUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    if (!res.ok) throw new Error('Login failed')
    return res.json() // { token }
  },

  /**
   * --- RESERVATIONS ---
   */
  async getReservations(token: string) {
    const res = await fetch(`${baseUrl}/reservations`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    if (!res.ok) throw new Error('Failed to fetch reservations')
    return res.json()
  },

  async createReservation(
    token: string,
    reservation: {
      roomId: string
      resourceId?: string
      date: string
      startTime: string
      endTime: string
      description?: string
    }
  ) {
    const res = await fetch(`${baseUrl}/reservations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(reservation),
    })
    if (!res.ok) throw new Error('Failed to create reservation')
    return res.json()
  },

  /**
   * --- ROOMS ---
   */
  async getRooms(token: string) {
    const res = await fetch(`${baseUrl}/rooms`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    if (!res.ok) throw new Error('Failed to fetch rooms')
    return res.json()
  },

  async createRoom(
    token: string,
    room: { name: string; capacity: number; location: string }
  ) {
    const res = await fetch(`${baseUrl}/rooms`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(room),
    })
    if (!res.ok) throw new Error('Failed to create room')
    return res.json()
  },

  async deleteRoom(token: string, id: string) {
    const res = await fetch(`${baseUrl}/rooms/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    })
    if (!res.ok) throw new Error('Failed to delete room')
    return res.json()
  },

  /**
   * --- RESOURCES ---
   */
  async getResources(token: string) {
    const res = await fetch(`${baseUrl}/resources`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    if (!res.ok) throw new Error('Failed to fetch resources')
    return res.json()
  },

  async createResource(
    token: string,
    resource: { type: string; description: string; available: boolean }
  ) {
    const res = await fetch(`${baseUrl}/resources`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(resource),
    })
    if (!res.ok) throw new Error('Failed to create resource')
    return res.json()
  },

  async deleteResource(token: string, id: string) {
    const res = await fetch(`${baseUrl}/resources/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    })
    if (!res.ok) throw new Error('Failed to delete resource')
    return res.json()
  },
}
