package com.mbds.mbdsboites.fragments

import android.util.Log
import androidx.fragment.app.Fragment
import com.mbds.mbdsboites.listeners.ObjectClickListener
import com.mbds.newsletter.models.Object

class ObjectsFragment : Fragment(), ObjectClickListener {
    override fun onCustomerClick(`object`: Object, favoriteId: Int?) {
        Log.v("ArticlesFragment", "Favorite Clicked in Article ")

        if(favoriteId == null)
            db.addFavorite(Object)
        else
            db.deleteFavorite(favoriteId)
    }
}


/*
class ArticlesFragment : Fragment(), ArticleClickListener {

    private var source:String = ""
    private var category: String = ""
    private var country: String = ""
    private var action: String = ""
    private var favorites: Array<Favorite> = emptyArray()


    // Data About API PAGINATION
    private var page:Int = 1
    private var numberPages: Int = 1

    private lateinit var binding: FragmentArticlesBinding
    private val repository: NewsApiRepository = NewsApiRepository()
    private val adapter = ArticleAdapter(mutableListOf(), emptyArray(), this)
    private lateinit var db: FavoriteViewModel

    // Skelton
    private lateinit var skelton: RecyclerViewSkeletonScreen

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        binding = FragmentArticlesBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        // Init ViewModel DB
        db = ViewModelProvider(this).get(FavoriteViewModel::class.java)

        // Init recyclerView
        val recyclerView: RecyclerView = view.findViewById(R.id.article_recycler_view)
        val adapterRecycler = adapter
        recyclerView.layoutManager = LinearLayoutManager(view?.context)
        recyclerView.adapter = adapterRecycler


        // Create the skeleton
        skelton = Skeleton.bind(recyclerView)
            .adapter(adapter)
            .load(R.layout.articles_list)
            .show();

        // Call Listners
        listners()

        // Call API if Data isnt in Local
        if(action != Endpoints.FAVORITES)
            lifecycleScope.launch {
                getData(source = source, category = category, country = country, action = action)
            }


    }

    companion object {
        fun newInstance(source: String, country: String, category: String, action: String): ArticlesFragment {
            return ArticlesFragment().apply {
                this.source = source
                this.category = category
                this.country = country
                this.action = action
            }
        }
    }

    private suspend fun getData(source: String, country: String, category: String, action: String, page:Int=1) {
        withContext(Dispatchers.IO) {
            var result: ArticlesResponse?

            if(action == Endpoints.EVERYTHING)
                result = repository.everything(category, source, page)
            else
                result = repository.headlines(country, category, page)


            if(result != null )
                if(result?.status == "ok") {
                    Log.v("ArticlesFragment", "Articles fetched count : " + result?.totalResults)
                    setData(result)
                }
        }
    }

    private suspend fun setData(result: ArticlesResponse){
        withContext(Dispatchers.Main) {
            numberPages = ceil(result.totalResults / 20.0).toInt()
            if(result.articles != null) {
                adapter.dataset.clear()
                adapter.dataset.addAll(result.articles)
                adapter.notifyDataSetChanged()
            }

            skelton.hide()
        }
    }

    override fun onCustomerClick(article: Article, favoriteId: Int?) {
        Log.v("ArticlesFragment", "Favorite Clicked in Article ")

        if(favoriteId == null)
            db.addFavorite(article)
        else
            db.deleteFavorite(favoriteId)
    }

    fun listners() {
        db.allFavorites.observe(viewLifecycleOwner, Observer { data ->
            Log.v("ArticlesFragment", "Favorites fetched count : " + data.size)
            favorites = data.toTypedArray()
            adapter.favorites = favorites

            if (action == Endpoints.FAVORITES) {
                adapter.dataset = Converter.favoritesToArticles(favorites)
                skelton.hide()
            }

            adapter.notifyDataSetChanged()
        })


        // PAGINATION
        if(action == Endpoints.FAVORITES) {
            (binding.buttonNext.getParent() as ViewGroup).removeView(binding.buttonNext)
            (binding.buttonPrevious.getParent() as ViewGroup).removeView(binding.buttonPrevious)
        } else {
            binding.buttonNext.setOnClickListener {
                Log.v("ArticlesFragment", "Button Next Clicked page : " + page + " pages size : " + numberPages)
                if(page < numberPages) {
                    page += 1
                    lifecycleScope.launch {
                        getData(source = source, category = category, country = country, action = action, page = page )
                    }
                }
            }
            binding.buttonPrevious.setOnClickListener {
                if(page > 1) {
                    page -= 1
                    lifecycleScope.launch {
                        getData(source = source, category = category, country = country, action = action, page = page )
                    }
                }
            }
        }

    }

}

 */