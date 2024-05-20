The app is a search result of google images.

For APIs, you can use the list view (paginated) and a single image of the site picsum
https://picsum.photos/

Eg. For getting list
https://picsum.photos/v2/list?page=2&limit=100


Implementation:

Components:
App: This Component renders the SearchBar and the Result, also called the paginated search api using useSearch hook.

VirtualizedGrid: This Component renders the images. here i have used React-virtualize library to implement virtualization in List.that will make sure that we are rendering only needed elements in DOM (in view port).which will optimized our app and user experience.(compare to ResultList component).

ResultList: rendering the list of images normal way.(while scrolling UI will feel laggy if there are lot of elements mounted)

Infinite scrolling using Intersection Observer : I have used intersection observer to check if user has scrolled to the end of the list and we have to fetch new Items via making api call.so whenever last element of list is intersecting the viewport I am updating page,which will fetch the data for updated page.


Future Optimisation:
1. we can load the images in compressed formate (WebP).so it will take lesser time to download.
2. we can load different image sizes based on device view port. (using img tag srcset attribute)
3. we can extend our useSearch hook (if Search is supported in api) by just passing searchText as argument and in effect dependency.



