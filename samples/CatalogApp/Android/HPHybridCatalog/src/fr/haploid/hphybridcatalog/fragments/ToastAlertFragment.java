package fr.haploid.hphybridcatalog.fragments;

import android.view.View;
import android.widget.Toast;
import fr.haploid.androidnativebridge.customviews.OverScrollingWebView;
import fr.haploid.androidnativebridge.fragments.HTMLFragment;
import fr.haploid.hphybridcatalog.R;

public class ToastAlertFragment extends HTMLFragment {

	@Override
	protected int getLayoutToInflate() {
		return R.layout.simple_hybrid_fragment;
	}

	/*
	@Override
	protected void setUpViews(View rootView) {
		webView = (OverScrollingWebView) rootView.findViewById(R.id.webView);
	}
	*/
	
	public void alertDialogClickedButton(long tag,int buttonIndex)
	{
		Toast.makeText(mContext, "tag = "+tag+" || buttonIndex = "+(-1-buttonIndex), Toast.LENGTH_SHORT).show();
	}
}