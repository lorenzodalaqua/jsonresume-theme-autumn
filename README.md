# Autumn Theme for JSON Resume

This is the Autumn theme for the [JSON Resume](https://jsonresume.org/) project. It is built using [Tailwind CSS](https://tailwindcss.com/).

![Preview of a resume using the Autumn theme](https://user-images.githubusercontent.com/8523099/149596708-7cd2c487-939e-4f83-b7fd-0b8e6abfddf1.png)

## Development / Extension

The theme is built using Gulp for compiling handlebars templates and Tailwind CSS.

To customize this theme or use this as a template to write your own you will need node.js and NPM installed on your system.

1. Clone this repository
1. install the dependencies with `npm install`
1. `npm run dev`
1. View at `localhost:8888`
1. Theme fallsback to `resume-sample.json` when `resume.json` does not exist 😻 #smart.
1. Add your resume file `resume.json` to the project/theme's root folder
    1. Put in the same location as `resume-sample.json`
    1. ...or put it in your project root if using this theme as a package.

Any changes you make to any file in the `views` and `styles` folders will be reflected in the result (you still need to refresh the page).

## License

Available under [the MIT license](http://mths.be/mit).
