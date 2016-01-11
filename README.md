# Auto Download App - Work in progress...

## Introduction

The goal of Auto Download App is to automate file download on Synology NAS

## Api
The application is connected to multiple API :
- RealDebrid to unrestrict file links and download torrents
- TheMovieDB to get movies and tvshows information
- T411 to get torrent files
- Synology to download files from links 

## Process
1. Choose Movie and TV show (choose seasons and episodes) from TheMovieDB Api
2. Get torrent from T411 Api
3. Download torrent, upload it with uptobox and unrestrict the uptobox link with RealDebrid Api
4. Download file and move it in the right folder on Synology NAS with Synology Api

## User Experience

The app uses Material Design and is responsive (from mobile to desktop) to offer a very great experience and is very easy to use.

## Technologies

Auto download uses differents technlogies :
- AngularJS
- NodeJS
- MongoDB
- RESTful API
