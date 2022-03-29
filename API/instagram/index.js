const fetch = require('node-fetch');

module.exports = {
    dataProfile: async (username) => {
        const body = await ( await fetch(`https://www.instagram.com/${username}/?__a=1`) ).text();
        const dataParse = JSON.parse(body);

        if (Object.keys(dataParse).length === 0) {
            return 'error'
        } else {
            const ig = dataParse.graphql.user;
            let data = {
                username: ig.username,
                fullName: ig.full_name,
                bio: ig.biography,
                extraBio: ig.external_url,
                follower: ig.edge_followed_by.count.toString(),
                followed: ig.edge_follow.count.toString(),
                profile: ig.profile_pic_url,
                profileHD: ig.profile_pic_url_hd,
                posting: ig.edge_owner_to_timeline_media.count.toString(),
            }

            if (data.follower.length > 3) {
                if (data.follower.length === 4 || data.follower.length <= 6) {
                    data.follower = data.follower.slice(0, 2) + 'k'
                    let ea = [...data.follower]
                    ea.splice(1, 0, ".")
                    data.follower = ea.join("")
                } else if (data.follower.length === 7 || data.follower.length <= 9) {
                    data.follower = data.follower.slice(0, 2) + 'm'
                    let ea = [...data.follower]
                    ea.splice(1, 0, ".")
                    data.follower = ea.join("")
                } else if (data.follower.length === 10 || data.follower.length <= 12) {
                    data.follower = data.follower.slice(0, 2) + 't'
                    let ea = [...data.follower]
                    ea.splice(1, 0, ".")
                    data.follower = ea.join("")
                }
            }
    
            if (data.followed.length > 3) {
                if (data.followed.length === 4 || data.followed.length <= 6) {
                    data.followed = data.followed.slice(0, 2) + 'k'
                    let ea = [...data.followed]
                    ea.splice(1, 0, ".")
                    data.followed = ea.join("")
                } else if (data.followed.length === 7 || data.followed.length <= 9) {
                    data.followed = data.followed.slice(0, 2) + 'm'
                    let ea = [...data.followed]
                    ea.splice(1, 0, ".")
                    data.followed = ea.join("")
                } else if (data.followed.length === 10 || data.followed.length <= 12) {
                    data.followed = data.followed.slice(0, 2) + 't'
                    let ea = [...data.followed]
                    ea.splice(1, 0, ".")
                    data.followed = ea.join("")
                }
            }
    
            if (data.posting.length > 3) {
                if (data.posting.length === 4 || data.posting.length <= 6) {
                    data.posting = data.posting.slice(0, 2) + 'k'
                    let ea = [...data.posting]
                    ea.splice(1, 0, ".")
                    data.posting = ea.join("")
                } else if (data.posting.length === 7 || data.posting.length <= 9) {
                    data.posting = data.posting.slice(0, 2) + 'm'
                    let ea = [...data.posting]
                    ea.splice(1, 0, ".")
                    data.posting = ea.join("")
                } else if (data.posting.length === 10 || data.posting.length <= 12) {
                    data.posting = data.posting.slice(0, 2) + 't'
                    let ea = [...data.posting]
                    ea.splice(1, 0, ".")
                    data.posting = ea.join("")
                }
            }

            if(data.extraBio === null) {
                data.extraBio = ""
            }
    
            return data
        }
    }
}