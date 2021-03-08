package com.mbds.mbdsboites.fragments

import android.util.Log
import androidx.fragment.app.Fragment
import com.mbds.mbdsboites.listeners.ObjectClickListener
import com.mbds.newsletter.models.Object

class ObjectsFragment : Fragment(), ObjectClickListener {
    override fun onCustomerClick(`object`: Object, favoriteId: Int?) {
        Log.v("ObjectsFragment", "Favorite Clicked in Object ")

        if(favoriteId == null)
            db.addFavorite(Object)
        else
            db.deleteFavorite(favoriteId)
    }
}
