# Using Transloco to display local and remote content/assets.

## Transloco JSON formats

##### Expected JSON format
`
{
  "key": {
    "local": "local asset",
    "remote": "url to remote asset"
}
`

#### Examples
##### Simple text article
`
{
    "primeSealWash": {
        "local": "This is a simple sentence",
        "remote": "http://cxmk.com/article1"
    }
}
`
- `<div> 'primeSealWash' | icsLocoSwitcher: hasInternet | transloco | icsTransloco | async </div>`


##### Simple text article with variables
`
{
    "columnManager": {
        "local": "The temperature range is $minTemperature - $maxTemperature",
        "remote": "http://cxmk.com/article2"
    }
}
`
- `<div>{{'withInterpolations' | icsLocoSwitcher: hasInternet | transloco | icsTransloco: {minTemperarature: 5.0, maxTemperature: 50.0} | async }} </div>`

##### Images
`
{
    "logo": {
      "local": "../assets/images/en/di.svg",
      "remote": "https://angular.io/generated/images/marketing/concept-icons/components.svg"
    }
}
`
- `<img [src]="'logo.path' | icsLocoSwitcher: hasInternet | transloco | icsTransloco | async" />`

##### Videos
`
{
    "video": {
      "local": "../assets/videos/en/earth.mp4",
      "remote": "https://www.w3schools.com/html/movie.mp4"
    }
}
`
- `<app-video width='200' height='200' [srcLink]="'movie.path' | icsLocoSwitcher: hasInternet | transloco | icsTransloco | async"></app-video>`

##### Rich content with html tags
`
{
    "article2": {
      "local": "<p>If you chose Configure settings for a non-regulated environment (non GxP)</uicontrol>, UNIFI software configures these global policies.</p><p><table><tr><th>Policy</th><th>Settings</th><th>Description</th></tr><tr><td>Audit Trail Reasons</td><td>No reasons and passwords required.</td><td>Users do not need to supply a reason and their password when they modify or delete a system object.</td></tr><tr><td>Timeout</td><td>60 minutes for both inactive work sessions and Signoff dialog box<td>The number of minutes that a work session can remain inactive before the application closes and users must enter their user names and passwords to log back on to the software.The number of minutes that the Signoff dialog box can remain inactive before it closes.</tr><tr><td>User Account</td><td>No password or limit to the number of failed authentication attempts.</td><td>No user account password requirements and no limit to the number of times that users can enter their user name and password incorrectly before their account status is changed from active to disabled.</td></tr><tr><td>Qualification</td><td>No qualification requirements.</td><td>No tasks are required prior to performing a qualification.</td></tr></table></p><p>The data folder policy Non GxP is applied to the Company data folder and users do not need to supply a reason and their password when modify or delete objects such as analysis injections and reports that reside in data folders.</p>",
      "remote": "https://vercel-serverless-hujanais.vercel.app/api/waters?articleId=1"
    }
}
`
- `<div [innerHTML]="'article2.body' | icsLocoSwitcher: hasInternet | transloco | icsTransloco | async"> </div> `

##### Pipes

The icsLocoSwitcher pipe just appends a .local or .remote to the transloco key.
```  
transform(val: string, hasInternet?: boolean) {
    if (hasInternet) {
      return `${val}.remote`;
    }

    return `${val}.local`;
  }

```

The icsTransloco pipe just handles http requests for remote asset and to handle interpolation.  The native transloco directive will not be used for a generic solution.
```
async transform(val: string, args: {}) {
    // check to see if this is a link.
    // check to see if this is an img/svg.
    // check to see if this is a video asset.
    if (this.isImage(val)) {
      return val;
    } else if (this.isVideo(val)) {
      return val;
    } else if (this.isValidUrl(val)) {
      return this.http.get(val).pipe(
        map((data: any) => data.body),  // this map operation is dependent on the json content source. 
                                        // For this demonstration, the data payload looks like, {articleId: XX, body: YY}
        map((body: string) => this.interpolate(body, args))
      ).toPromise();
    }

    return this.interpolate(val, args);
  }
  
  // expecting text to be, "This is a sentence. $key1 $key2"
  // For now, the keys are case sensitive.
  // ex. The column hardware and the matched outlet tubing can withstand as much as $maxPressurekPa kPa ($maxPressureBar bar, $maxPressurePSI psi).
  private interpolate(body: string, args: {}): string {
    if (args) {
      // search for all variables defined in the article body.
      Object.keys(args).forEach(key => {
        const placeHolder = '$' + key;
        body = body.replace(placeHolder, args[key]);
      });
    }

    return body;
  }
  
```

