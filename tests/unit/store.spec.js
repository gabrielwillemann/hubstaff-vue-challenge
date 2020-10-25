import {
  state as createState,
  getters as createGetters,
  mutations as createMutations
} from '@/store/index.js'

describe('vuex', () => {
  describe('mutations', () => {
    let state, mutations

    beforeEach(() => {
      state = createState()
      mutations = createMutations()
    })

    test('method "setFilterName" set state', () => {
      let name = 'Paul McCartney'
      mutations.setFilterName(state, name)
      expect(state.filters.name).toBe(name)
    })

    test('method "setFilterRole" set state', () => {
      let role = 'Viewer'
      mutations.setFilterRole(state, role)
      expect(state.filters.role).toBe(role)
    })

    test('method "setFilterTimeTracking" set state', () => {
      let timeTracking = 'enabled'
      mutations.setFilterTimeTracking(state, timeTracking)
      expect(state.filters.timeTracking).toBe(timeTracking)
    })

    test('method "setMemberSelected" set state', () => {
      state.members = [
        { selected: true },
        { selected: false },
        { selected: false }
      ]

      mutations.setMemberSelected(state, { index: 1, selected: true })
      expect(state.members[1].selected).toBe(true)

      mutations.setMemberSelected(state, { index: 0, selected: false })
      expect(state.members[0].selected).toBe(false)
    })

    test('method "setMemberHovered" set state', () => {
      state.members = [
        { selected: false },
        { selected: true },
        { selected: false }
      ]

      mutations.setMemberHovered(state, { index: 1, hovered: false })
      expect(state.members[1].hovered).toBe(false)

      mutations.setMemberHovered(state, { index: 2, hovered: true })
      expect(state.members[2].hovered).toBe(true)
    })

    test('method "setMembers" set state with 3 records', () => {
      const dataMembers = {
        count: 3,
        members: [
          {
            id: '1',
            name: 'Jared Brown',
            role: 'Owner',
            projects: 8,
            payment: null,
            limits: { weekly: null, daily: 8 },
            time_tracking: 'enabled'
          },
          {
            id: '2',
            name: 'Adrian Goia',
            role: 'Viewer',
            projects: 5,
            payment: null,
            limits: { weekly: 50, daily: 8 },
            time_tracking: 'enabled'
          },
          {
            id: '3',
            name: 'Cody Rogers',
            role: 'Viewer',
            projects: 8,
            payment: null,
            limits: { weekly: 40, daily: null },
            time_tracking: 'enabled'
          }
        ]
      }

      mutations.setMembers(state, dataMembers)

      expect(state.membersCount).toBe(dataMembers.count)
      expect(state.members.length).toBe(dataMembers.members.length)

      for (let i = 0; i < dataMembers.members.length; i++) {
        const dataMember = dataMembers.members[i]
        const member = state.members[i]
        for (const key in dataMember) {
          expect(member[key]).toBe(dataMember[key])
          expect(member.selected).toBe(false)
          expect(member.hovered).toBe(false)
        }
      }
    })
  })

  describe('getters', () => {
    let state, getters

    beforeEach(() => {
      state = createState()
      getters = createGetters()

      state.membersCount = 3
      state.members = [
        {
          id: '1',
          name: 'Jared Brown',
          role: 'Owner',
          projects: 8,
          payment: null,
          limits: { weekly: null, daily: 8 },
          time_tracking: 'enabled',
          selected: false,
          hovered: false
        },
        {
          id: '2',
          name: 'Adrian Goia',
          role: 'Viewer',
          projects: 5,
          payment: null,
          limits: { weekly: 50, daily: 8 },
          time_tracking: 'enabled',
          selected: false,
          hovered: false
        },
        {
          id: '3',
          name: 'Cody Rogers',
          role: 'Viewer',
          projects: 8,
          payment: null,
          limits: { weekly: 40, daily: null },
          time_tracking: 'enabled',
          selected: false,
          hovered: false
        }
      ]
    })

    test('"membersFiltered" without filters', () => {
      expect(getters.membersFiltered(state)).toHaveLength(3)
    })

    test('"membersFiltered" with name', () => {
      state.filters.name = 'jared'
      expect(getters.membersFiltered(state)).toHaveLength(1)

      state.filters.name = 'Brown'
      expect(getters.membersFiltered(state)).toHaveLength(1)

      state.filters.name = 'a'
      expect(getters.membersFiltered(state)).toHaveLength(2)

      state.filters.name = 'ro'
      expect(getters.membersFiltered(state)).toHaveLength(2)

      state.filters.name = 'O'
      expect(getters.membersFiltered(state)).toHaveLength(3)

      state.filters.name = 'X'
      expect(getters.membersFiltered(state)).toHaveLength(0)
    })

    test('"membersFiltered" with name and role', () => {
      state.filters.name = 'Brown'
      state.filters.role = 'Owner'
      expect(getters.membersFiltered(state)).toHaveLength(1)

      state.filters.name = 'Brown'
      state.filters.role = 'Viewer'
      expect(getters.membersFiltered(state)).toHaveLength(0)

      state.filters.name = 'O'
      state.filters.role = 'Viewer'
      expect(getters.membersFiltered(state)).toHaveLength(2)

      state.filters.name = 'goi'
      state.filters.role = 'Viewer'
      expect(getters.membersFiltered(state)).toHaveLength(1)

      state.filters.name = 'xx'
      state.filters.role = 'Viewer'
      expect(getters.membersFiltered(state)).toHaveLength(0)
    })

    test('"membersFiltered" with name and timeTracking', () => {
      state.filters.name = 'Brow'
      state.filters.timeTracking = 'enabled'
      expect(getters.membersFiltered(state)).toHaveLength(1)

      state.filters.name = 'Brow'
      state.filters.timeTracking = 'disabled'
      expect(getters.membersFiltered(state)).toHaveLength(0)

      state.filters.name = 'a'
      state.filters.timeTracking = 'enabled'
      expect(getters.membersFiltered(state)).toHaveLength(2)

      state.filters.name = 'xx'
      state.filters.timeTracking = 'enabled'
      expect(getters.membersFiltered(state)).toHaveLength(0)
    })

    test('"membersFiltered" with name, role and timeTracking', () => {
      state.filters.name = 'Bro'
      state.filters.timeTracking = 'enabled'
      state.filters.role = 'Owner'
      expect(getters.membersFiltered(state)).toHaveLength(1)

      state.filters.name = '^Ad'
      state.filters.timeTracking = 'enabled'
      state.filters.role = 'Viewer'
      expect(getters.membersFiltered(state)).toHaveLength(1)

      state.filters.name = 'a'
      state.filters.timeTracking = 'disabled'
      state.filters.role = 'Viewer'
      expect(getters.membersFiltered(state)).toHaveLength(0)

      state.filters.name = 'o'
      state.filters.timeTracking = 'enabled'
      state.filters.role = 'Viewer'
      expect(getters.membersFiltered(state)).toHaveLength(2)
    })

    test('"membersFiltered" with role', () => {
      state.filters.role = 'Owner'
      expect(getters.membersFiltered(state)).toHaveLength(1)

      state.filters.role = 'Viewer'
      expect(getters.membersFiltered(state)).toHaveLength(2)
    })

    test('"membersFiltered" with role and timeTracking', () => {
      state.filters.role = 'Owner'
      state.filters.timeTracking = 'enabled'
      expect(getters.membersFiltered(state)).toHaveLength(1)

      state.filters.role = 'Owner'
      state.filters.timeTracking = 'disabled'
      expect(getters.membersFiltered(state)).toHaveLength(0)

      state.filters.role = 'Viewer'
      state.filters.timeTracking = 'enabled'
      expect(getters.membersFiltered(state)).toHaveLength(2)

      state.filters.role = 'Viewer'
      state.filters.timeTracking = 'disabled'
      expect(getters.membersFiltered(state)).toHaveLength(0)
    })

    test('"membersFiltered" with timeTracking', () => {
      state.filters.timeTracking = 'enabled'
      expect(getters.membersFiltered(state)).toHaveLength(3)

      state.filters.timeTracking = 'disabled'
      expect(getters.membersFiltered(state)).toHaveLength(0)
    })

    test('counting "membersOwner"', () => {
      expect(getters.membersOwner(state)).toHaveLength(1)
    })
  })
})
