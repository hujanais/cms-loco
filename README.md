# Using Transloco to display local and remote content/assets.

## Transloco JSON formats
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


