from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas import SettingsBase, SettingsResponse
from app import crud

router = APIRouter(
    prefix="/api/settings",
    tags=["Settings"]
)


# GET: Retrieve administrator settings
@router.get("/", response_model=SettingsResponse)
def read_settings(db: Session = Depends(get_db)):
    return crud.get_admin_settings(db)


# PUT: Update administrator settings
@router.put("/", response_model=SettingsResponse)
def update_settings(
    settings: SettingsBase,
    db: Session = Depends(get_db)
):
    return crud.update_admin_settings(db, settings)