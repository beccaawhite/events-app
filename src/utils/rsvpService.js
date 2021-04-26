import tokenService from './tokenService';

const BASE_URL = "/api"

export function create(postId){
    console.log("create RSVP like")
    return fetch(`${BASE_URL}/posts/${postId}/rsvp`, {
        method: "POST",
        headers: {
            'Authorization': 'Bearer ' + tokenService.getToken()
          }
    }).then(res => res.join())
}

export function removeRsvp(rsvpId){
    console.log("remove RSVP like")
    return fetch(`${BASE_URL}/rsvp/${rsvpId}`,{
        method: "DELETE",
        headers: {
            'Authorization': 'Bearer ' + tokenService.getToken()
          }
    }).then(res => res.join())
}