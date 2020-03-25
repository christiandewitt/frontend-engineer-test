export const parse = function (data) {
    let movies = data.features
        // Filter records of type 'Movie'
        .filter(movie => movie.attributes.Type === "Movie")
        // Filter out duplicates
        .filter(
            (movie, index, self) =>
                index === self.findIndex((t) => (
                    t.attributes.Address === movie.attributes.Address &&
                    t.attributes.Site === movie.attributes.Site &&
                    t.attributes.ShootDate === movie.attributes.ShootDate
                ))
        )
        // Filter valid locations
        .filter(movie => (!isNaN(movie.geometry.x) && !isNaN(movie.geometry.x)));

    // Group movie data by location
    movies = movies.reduce(function (r, a) {
        r[a.attributes.Title] = r[a.attributes.Title] || [];

        // Check if a match is found on address and site
        const matchIndex = r[a.attributes.Title].findIndex((t) => (
            t.address === a.attributes.Address &&
            t.site === a.attributes.Site
        ));

        // If a match is found, just add shoot date to collection, otherwise create new record
        if (matchIndex !== -1) {
            r[a.attributes.Title][matchIndex].shootDate.push(a.attributes.ShootDate);
        } else {
            r[a.attributes.Title].push({
                address: a.attributes.Address,
                site: a.attributes.Site,
                location: a.geometry,
                shootDate: [a.attributes.ShootDate]
            });
        }

        return r;
    }, Object.create(null));

    const parsed = [];

    for (let [title, locations] of Object.entries(movies)) {
        parsed.push({
            title: title,
            locations: locations
        });
    }

    return parsed;
};