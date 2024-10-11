import {ref} from 'vue'
const eventId = ref('')
export const setEventId = (newEventId) => {
        eventId.value = newEventId
}
export const getEventId = () => {
    return eventId.value
}